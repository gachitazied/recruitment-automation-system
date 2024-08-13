package com.RAS.recruitment_automation_system.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;


@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "ziedGachita",
                        email = "zgachita15@gmail.com",
                        url = "https://ziedgach.com/courses"
                ),
                description = "OpenApi documentaion for spring security",
                title = "OpenApi specification - zied gach ",
                version = "1.0",
                license = @License(
                        name = "licence name",
                        url = "https://some-url.com"
                ),
                termsOfService = "terms of service"
        ),
        servers = {
                @Server(
                        description = "Local ENV ",
                        url = "http://localhost:8088/api/v1"
                ),
                @Server(
                        description = "PROD ENV",
                        url = "https://ziedgach.com/courses"
                )
        },
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }

)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth descpiption",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)

public class OpenApiConfig {
}
