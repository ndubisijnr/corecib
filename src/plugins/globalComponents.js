import BaseInput from '@/components/inputs/BaseInput.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import Card from '@/components/cards/Card.vue';
import Modal from '@/components/Modal.vue';
import Modal1 from '@/components/Modal1.vue';
import StatsCard from '@/components/cards/StatsCard.vue';
import BaseButton from '@/components/BaseButton.vue';
import Badge from '@/components/Badge.vue';
import RouteBreadcrumb from '@/components/breadcrumb/RouteBreadcrumb';
import BaseCheckbox from '@/components/inputs/BaseCheckbox.vue';
import BaseSwitch from '@/components/BaseSwitch.vue';
import BaseRadio from "@/components/inputs/BaseRadio";
import BaseProgress from "@/components/BaseProgress";
import BasePagination from "@/components/BasePagination";
import BaseAlert from "@/components/BaseAlert";
import BaseNav from "@/components/navbar/BaseNav";
import BaseHeader from '@/components/BaseHeader';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { Input, Tooltip, Popover } from 'element-ui';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
    install(Vue) {
        Vue.component(Badge.name, Badge);
        Vue.component(BaseAlert.name, BaseAlert);
        Vue.component(BaseButton.name, BaseButton);
        Vue.component(BaseCheckbox.name, BaseCheckbox);
        Vue.component(BaseHeader.name, BaseHeader);
        Vue.component(BaseInput.name, BaseInput);
        Vue.component(BaseDropdown.name, BaseDropdown);
        Vue.component(BaseNav.name, BaseNav);
        Vue.component(BasePagination.name, BasePagination);
        Vue.component(BaseProgress.name, BaseProgress);
        Vue.component(BaseRadio.name, BaseRadio);
        Vue.component(BaseSwitch.name, BaseSwitch);
        Vue.component(Card.name, Card);
        Vue.component(Modal.name, Modal);
        Vue.component(Modal1.name, Modal1);
        Vue.component(StatsCard.name, StatsCard);
        Vue.component(RouteBreadcrumb.name, RouteBreadcrumb);
        Vue.component(Input.name, Input);
        Vue.component('validation-provider', ValidationProvider)
        Vue.component('validation-observer', ValidationObserver)
        Vue.use(Tooltip);
        Vue.use(Popover);
    }
};

export default GlobalComponents;