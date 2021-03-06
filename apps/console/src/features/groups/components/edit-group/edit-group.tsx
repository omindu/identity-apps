/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { hasRequiredScopes, isFeatureEnabled } from "@wso2is/core/helpers";
import { SBACInterface } from "@wso2is/core/models";
import { ResourceTab } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// TODO: Move to shared components.
import { useSelector } from "react-redux";
import { GroupRolesList } from "./edit-group-roles";
import { GroupUsersList } from "./edit-group-users";
import { FeatureConfigInterface } from "../../../core/models";
import { AppState } from "../../../core/store";
import { BasicRoleDetails } from "../../../roles";
import { GroupConstants } from "../../constants";
import { GroupsInterface } from "../../models";

/**
 * Captures props needed for edit group component
 */
interface EditGroupProps extends SBACInterface<FeatureConfigInterface> {
    /**
     * Group ID
     */
    groupId: string;
    /**
     * Group details
     */
    group: GroupsInterface;
    /**
     * Handle group update callback.
     */
    onGroupUpdate: () => void;
    /**
     * List of readOnly user stores.
     */
    readOnlyUserStores?: string[];
}

/**
 * Component which will allow editing of a selected group.
 *
 * @param props contains group details to be edited.
 */
export const EditGroup: FunctionComponent<EditGroupProps> = (props: EditGroupProps): ReactElement => {

    const {
        group,
        onGroupUpdate,
        featureConfig,
        readOnlyUserStores
    } = props;

    const { t } = useTranslation();

    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.scope);
    const isGroupAndRoleSeparationEnabled: boolean = useSelector(
        (state: AppState) => state?.config?.ui?.isGroupAndRoleSeparationEnabled);

    const [ isReadOnly, setReadOnly ] = useState<boolean>(false);

    useEffect(() => {
        if(!group) {
            return;
        }

        const userStore = group?.displayName.split("/");

        if (!isFeatureEnabled(featureConfig?.groups, GroupConstants.FEATURE_DICTIONARY.get("GROUP_UPDATE"))
            || readOnlyUserStores?.includes(userStore?.toString())
            || !hasRequiredScopes(featureConfig?.groups, featureConfig?.groups?.scopes?.update, allowedScopes)
        ) {
            setReadOnly(true);
        }
    }, [ group, readOnlyUserStores ]);

    const resolveResourcePanes = () => {
        const panes = [
            {
                menuItem: t("adminPortal:components.roles.edit.menuItems.basic"),
                render: () => (
                    <ResourceTab.Pane controlledSegmentation attached={ false }>
                        <BasicRoleDetails
                            data-testid="group-mgt-edit-group-basic"
                            isGroup={ true }
                            roleObject={ group }
                            onRoleUpdate={ onGroupUpdate }
                            isReadOnly={ isReadOnly }
                        />
                    </ResourceTab.Pane>
                )
            },{
                menuItem: t("adminPortal:components.roles.edit.menuItems.users"),
                render: () => (
                    <ResourceTab.Pane controlledSegmentation attached={ false }>
                        <GroupUsersList
                            data-testid="group-mgt-edit-group-users"
                            isGroup={ true }
                            group={ group }
                            onGroupUpdate={ onGroupUpdate }
                            isReadOnly={ isReadOnly }
                        />
                    </ResourceTab.Pane>
                )
            }
        ];

        if (isGroupAndRoleSeparationEnabled) {
            panes.push(
                {
                    menuItem: t("adminPortal:components.roles.edit.menuItems.roles"),
                    render: () => (
                        <ResourceTab.Pane controlledSegmentation attached={ false }>
                            <GroupRolesList
                                data-testid="group-mgt-edit-group-roles"
                                group={ group }
                                onGroupUpdate={ onGroupUpdate }
                                isReadOnly={ isReadOnly }
                            />
                        </ResourceTab.Pane>
                    )
                }
            );
        }

        return panes;
    };

    return (
        <ResourceTab panes={ resolveResourcePanes() } />
    );
};
