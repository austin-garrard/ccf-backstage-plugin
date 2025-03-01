/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import {
  Content,
  ErrorPanel,
  Header,
  HeaderLabel,
  Page,
  Progress,
} from '@backstage/core-components';
import { FlatRoutes } from '@backstage/core-app-api';
import { ThemeProvider } from '@material-ui/core';
import { defaultTheme } from '@cloud-carbon-footprint/client';
import { PluginTabs } from './PluginTabs';

// TODO: Can we change the location from the cache-files? `packages/backend` is far from optimal :/
export const Plugin = ({ loading }: { loading?: boolean }) => {
  const [error, setError] = useState<Error>();

  return (
    <Page themeId="tool">
      <Header title="Cloud Carbon Footprint" type="tool">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        {error && (
          <p>
            <ErrorPanel error={error} />
          </p>
        )}
        {loading && <Progress />}
        <ThemeProvider theme={defaultTheme()}>
          <FlatRoutes>
            <Route
              path="/*"
              element={<PluginTabs error={error} setError={setError} />}
            />
          </FlatRoutes>
        </ThemeProvider>
      </Content>
    </Page>
  );
};
