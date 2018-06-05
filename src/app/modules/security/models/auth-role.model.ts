// 3rd party decorator
import { JsonObject, JsonProperty } from 'json2typescript';
import { TypeContract } from '../../../global/contracts/modules/tag.contract';
import { RoleContract } from '../../../global/contracts/modules/user.contract';

@JsonObject
export class Permissions {

    @JsonProperty('model', String)
    model: string;

    @JsonProperty('permission', String)
    permission: string;

    /**
     * Construct the model
     */
    constructor(model: string, permission: string) {
        this.model      = model;
        this.permission = permission;
    }
}

@JsonObject
export class AuthRole implements RoleContract {
    @JsonProperty('roleID')
    roleID: number;

    @JsonProperty('slug', String)
    slug: string;

    @JsonProperty('label', String)
    label: string;

    @JsonProperty('description', String)
    description: string;

    @JsonProperty('perms', [Permissions])
    perms:  Permissions[];

    /**
     *
     */
    constructor(id: number, slug: string, label: string, description: string, perms: Permissions[]) {
            this.roleID             = id;
            this.slug           = slug;
            this.label         = label;
            this.description    = description;
            this.perms          = perms;
    }
}

@JsonObject
export class AuthRoleService {
    @JsonProperty('data', [AuthRole])
    data: AuthRole[];
}

