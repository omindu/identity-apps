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

/**
 * Class containing constants related to help panel.
 */
export class DocumentationConstants {

    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */

    /* eslint-disable @typescript-eslint/no-empty-function */
    private constructor() {
    }

    /**
     * Key to find the developer portal docs.
     * @constant
     * @type {string}
     */
    public static readonly PORTAL_DOCS_KEY = "[\"Developer Portal\"]";

    public static readonly Samples_Catalog: Map<string, string> = new Map<string, string>()
        .set("JS_SPA_SAMPLE", "https://github.com/wso2-extensions/identity-samples-js/releases/download/0.1.0/" +
            "identity-authenticate-sample-js-spa.zip")
}
