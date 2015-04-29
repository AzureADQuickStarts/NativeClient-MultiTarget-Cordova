/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// TODO: Add the configuration values for your Azure AD application.

var app = {
    // Invoked when Cordova is fully loaded.
    onDeviceReady: function() {
        document.getElementById('search').addEventListener('click', app.search);
    },
    // Implements search operations.
    search: function () {
        document.getElementById('userlist').innerHTML = "";

        app.authenticate(function (authresult) {
            var searchText = document.getElementById('searchfield').value;
            app.requestData(authresult, searchText);
        });
    },
    
    // TODO: Make a token request using ADAL

    // TODO: Call the Azure AD Graph API using the token acquired above.

    // Renders user list.
    renderData: function(data) {
        var users = data && data.value;
        if (users.length === 0) {
            app.error("No users found");
            return;
        }

        var userlist = document.getElementById('userlist');
        userlist.innerHTML = "";

        // Helper function for generating HTML
        function $new(eltName, classlist, innerText, children, attributes) {
            var elt = document.createElement(eltName);
            classlist.forEach(function (className) {
                elt.classList.add(className);
            });

            if (innerText) {
                elt.innerText = innerText;
            }

            if (children && children.constructor === Array) {
                children.forEach(function (child) {
                    elt.appendChild(child);
                });
            } else if (children instanceof HTMLElement) {
                elt.appendChild(children);
            }

            if(attributes && attributes.constructor === Object) {
                for(var attrName in attributes) {
                    elt.setAttribute(attrName, attributes[attrName]);
                }
            }

            return elt;
        }

        users.map(function(userInfo) {
            return $new('li', ['topcoat-list__item'], null, [
                $new('div', [], null, [
                    $new('p', ['userinfo-label'], 'First name: '),
                    $new('input', ['topcoat-text-input', 'userinfo-data-field'], null, null, {
                        type: 'text',
                        readonly: '',
                        placeholder: '',
                        value: userInfo.givenName || ''
                    })
                ]),
                $new('div', [], null, [
                    $new('p', ['userinfo-label'], 'Last name: '),
                    $new('input', ['topcoat-text-input', 'userinfo-data-field'], null, null, {
                        type: 'text',
                        readonly: '',
                        placeholder: '',
                        value: userInfo.surname || ''
                    })
                ]),
                $new('div', [], null, [
                    $new('p', ['userinfo-label'], 'UPN: '),
                    $new('input', ['topcoat-text-input', 'userinfo-data-field'], null, null, {
                        type: 'text',
                        readonly: '',
                        placeholder: '',
                        value: userInfo.userPrincipalName || ''
                    })
                ]),
                $new('div', [], null, [
                    $new('p', ['userinfo-label'], 'Phone: '),
                    $new('input', ['topcoat-text-input', 'userinfo-data-field'], null, null, {
                        type: 'text',
                        readonly: '',
                        placeholder: '',
                        value: userInfo.telephoneNumber || ''
                    })
                ])
            ]);
        }).forEach(function(userListItem) {
            userlist.appendChild(userListItem);
        });
    },
    // Renders application error.
    error: function(err) {
        var userlist = document.getElementById('userlist');
        userlist.innerHTML = "";

        var errorItem = document.createElement('li');
        errorItem.classList.add('topcoat-list__item');
        errorItem.classList.add('error-item');
        errorItem.innerText = err;

        userlist.appendChild(errorItem);
    }
};

document.addEventListener('deviceready', app.onDeviceReady, false);
