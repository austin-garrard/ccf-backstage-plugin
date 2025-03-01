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
import {
  RecommendationsFilterBar,
  RecommendationsTable,
  useRecommendationData,
} from '@cloud-carbon-footprint/client';
import { Grid } from '@material-ui/core';
import { Progress } from '@backstage/core-components';

export const RecommendationsTab = ({
  recommendations,
}: {
  recommendations: ReturnType<typeof useRecommendationData>;
}) => {
  const [useKilograms, setUseKilograms] = useState(false);

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <RecommendationsFilterBar
          {...recommendations.filterBarProps}
          setUseKilograms={setUseKilograms}
        />
        {recommendations.loading && <Progress />}
      </Grid>
      <Grid item>
        <RecommendationsTable
          emissionsData={recommendations.filteredEmissionsData}
          recommendations={recommendations.filteredRecommendationData}
          useKilograms={useKilograms}
        />
      </Grid>
    </Grid>
  );
};
