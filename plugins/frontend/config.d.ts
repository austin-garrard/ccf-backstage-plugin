
export interface Config {
  cloudCarbonFootprint?: {
    client?: {
      /**
       * The type of time period to be used. Defaults to 'months'
       * @visibility frontend
       */
      dateRangeType?: 'days' | 'weeks' | 'months' | 'quarters' | 'years';
      /**
       * The quantity of dateRangeType to be used. Defaults to 1
       * @visibility frontend
       */
      dateRangeValue?: number;

      /**
       * Value to set how the cloud provider queries should return data (e.g. day/week/month/quarter/year). Defaults to 'day'
       * @visibility frontend
       */
      groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year';

    };
  }
}
