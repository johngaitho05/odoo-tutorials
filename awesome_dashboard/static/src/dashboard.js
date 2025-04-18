/** @odoo-module **/

import {Component, onWillStart} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {Layout} from '@web/search/layout'
import {ControlPanel} from "@web/search/control_panel/control_panel";
import {useService} from "@web/core/utils/hooks";
import {_t} from "@web/core/l10n/translation";
import { DashboardItem } from './dashboard_item'
import { PieChart  } from './pie_chart'

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, ControlPanel, DashboardItem, PieChart }

    setup() {
        this.action = useService('action')
        this.dataService = useService('statistics')
        onWillStart(async () => {
            this.data = await this.dataService.loadStatistics()
        })
    }

    openCustomers(){
        this.action.doAction("base.action_partner_form");
    }

    openLeads(){
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: _t('Leads'),
            target: 'current',
            res_model: 'crm.lead',
            views: [[false, 'list'], [false, 'form']],
        });
    }
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);

