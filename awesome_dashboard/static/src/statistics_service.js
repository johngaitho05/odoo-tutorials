import { registry } from "@web/core/registry";
import { rpc } from '@web/core/network/rpc'
import { memoize } from "@web/core/utils/functions";

const statisticsService = {
    start() {
        return {
            // Cache the data until the page is refreshed
            loadStatistics: memoize(async () => {
                return await rpc('/awesome_dashboard/statistics');
            })
        };
    },
};

registry.category("services").add("statistics", statisticsService);
