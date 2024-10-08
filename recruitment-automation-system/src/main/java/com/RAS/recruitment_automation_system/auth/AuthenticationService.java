package com.RAS.recruitment_automation_system.auth;

import com.RAS.recruitment_automation_system.email.EmailService;
import com.RAS.recruitment_automation_system.email.EmailTemplateName;
import com.RAS.recruitment_automation_system.role.RoleRepository;
import com.RAS.recruitment_automation_system.security.JwtService;
import com.RAS.recruitment_automation_system.user.Token;
import com.RAS.recruitment_automation_system.user.TokenRepository;
import com.RAS.recruitment_automation_system.user.User;
import com.RAS.recruitment_automation_system.user.UserRepository;
import com.RAS.recruitment_automation_system.usersDetail.UserDetail;
import com.RAS.recruitment_automation_system.usersDetail.UserDetailRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.Local;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;
    private final AuthenticationManager autenticationManager;

    private final JwtService jwtService;


    private final UserDetailRepository userDetailRepository;

    private final EmailService emailService;
    @Value("${application.mailing.frontend.activation-url}")

    private String activationUrl;

    public void register_Can(RegistrationRequest request) throws MessagingException {
        var userRole = roleRepository.findByName("CANDIDATE")
                .orElseThrow(() -> new IllegalStateException("User role not found"));
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(userRole)
                .accountLocked(false)
                .enabled(false)
                .build();
        userRepository.save(user);
        sendValidationEmail(user);
    }

    public void register_Rec(RegistrationRequest request) throws MessagingException {
        var userRole = roleRepository.findByName("RECRUITER")
                .orElseThrow(() -> new IllegalStateException("User role not found"));
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(userRole)
                .accountLocked(false)
                .enabled(false)
                .build();
        userRepository.save(user);
        sendValidationEmail(user);
    }



    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                user.getEmail(),user.getUsername(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account Activation"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        //generate a token
        String generatedToken = generateActivatonCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private String generateActivatonCode(int length) {

        String characters = "0123456789";
        StringBuilder codeBuilder= new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i< length;i++)
        {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate_Can(AuthenticationRequest request) {
        var auth = autenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        var claims = new HashMap<String, Object>();
        var user = ((User)auth.getPrincipal());

        claims.put("Username",user.getEmail());

        var jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate_Rec(AuthenticationRequest request) {
        var auth = autenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        var claims = new HashMap<String, Object>();
        var user = ((User)auth.getPrincipal());

        claims.put("Username",user.getEmail());

        var jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    //@Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                // to
                .orElseThrow(()-> new RuntimeException("Invalid token"));
        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt()))
        {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired . a new token has been sent to the same email adress ");

        }

        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);

    }
}
