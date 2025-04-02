import {UserGlobalRole} from "../Interfaces/State/userStateTypes.ts";
import {FluxConfigManagementError} from "../services/api.ts";
import {UserConfigurationRole} from "../Interfaces/State/configurationsGeneralTypes.ts";

export function mapRoleStringEnumToType(enumStringValue: string): UserGlobalRole {
    switch (enumStringValue) {
        case "Member":
            return UserGlobalRole.Member;
        case "Trusted":
            return UserGlobalRole.Trusted;
        case "Admin":
            return UserGlobalRole.Admin;
        default:
            throw new FluxConfigManagementError(`Invalid role type returned from FluxConfig.Management api: ${enumStringValue}`);
    }
}

export function mapRoleTypEnumToString(role: UserGlobalRole): string {
    switch (role) {
        case UserGlobalRole.Member:
            return "Member";
        case UserGlobalRole.Trusted:
            return "Trusted";
        case UserGlobalRole.Admin:
            return "Admin";
    }
}

export function mapConfigRoleStringEnumToType(enumStringValue: string): UserConfigurationRole {
    switch (enumStringValue)
    {
        case "Member": return UserConfigurationRole.Member;
        case "Admin": return UserConfigurationRole.Admin;
        default: throw new FluxConfigManagementError(`Invalid configuration role type returned from FluxConfig.Management api: ${enumStringValue}`);
    }
}

export function mapConfigRoleTypEnumToString(role: UserConfigurationRole): string {
    switch(role) {
        case UserConfigurationRole.Member: return "Member";
        case UserConfigurationRole.Admin: return "Admin";
    }
}