import {FluxConfigManagementError} from "./api.ts";

export function validatePassword(password: string, confirmPassword: string): void {
    if (!password.trim()) {
        throw new FluxConfigManagementError("Password is required");
    } else if (password.length < 8) {
        throw new FluxConfigManagementError("Password must contain at least 8 characters");
    } else if (password.length > 50) {
        throw new FluxConfigManagementError("Password must contain at most 50 characters");
    } else if (password.trim() !== confirmPassword.trim()) {
        throw new FluxConfigManagementError("Password doesn't match confirm password");
    }
}

export function validateEmail(email: string): void {
    if (!email.trim()) {
        throw new FluxConfigManagementError("Email address is required");
    } else if (email.length > 100) {
        throw new FluxConfigManagementError("Email address must contain at most 100 characters");
    }
}

export function validateUsername(username: string): void {
    if (!username.trim()) {
        throw new FluxConfigManagementError("Username is required");
    } else if (username.length < 6) {
        throw new FluxConfigManagementError("Username must contain at least 6 characters");
    } else if (username.length > 50) {
        throw new FluxConfigManagementError("Username must contain at most 50 characters")
    }
}

export function validateUserSystemRoleStringEnum(userSystemRole: string): void {
    if (userSystemRole !== "Member" && userSystemRole !== "Trusted" && userSystemRole !== "Admin") {
        throw new FluxConfigManagementError("Invalid user global role value.");
    }
}

export function validateUserConfigurationRoleStringEnum(userSystemRole: string): void {
    if (userSystemRole !== "Member" && userSystemRole !== "Admin") {
        throw new FluxConfigManagementError("Invalid user configuration role value.");
    }
}

export function validateConfigurationName(name: string): void {
    if (!name.trim() || name.length < 1 ) {
        throw new FluxConfigManagementError("Configuration name is required");
    } else if (name.length > 100) {
        throw new FluxConfigManagementError("Configuration name must contain at most 100 characters");
    }
}

export function validateConfigurationTagName(tag: string): void {
    if (!tag.trim() || tag.length < 1 ) {
        throw new FluxConfigManagementError("Configuration tag name is required");
    } else if (tag.length > 30) {
        throw new FluxConfigManagementError("Configuration tag name must contain at most 30 characters");
    }
}

export function validateConfigurationDescription(description: string): void {
    if (description.length > 500) {
        throw new FluxConfigManagementError("Configuration description must contain at most 500 characters");
    }
}