<template>
  <component
    :is="baseComponent"
    :to="link.path"
    class="nav-item text-white"
    :class="{ 'active-page': Active === link.path || Active.includes(link.path)}"
    tag="li">
    <a
      v-if="isMenu"
      class="sidebar-menu-item nav-link"
      :class="{ 'active': isActive }"
      :aria-expanded="!collapsed"
      data-toggle="collapse"
      @click.prevent="collapseMenu">
      <template v-if="addLink">
        <span  :class="{'nav-link-text-dark' : Active === link.path || Active.includes(link.path)}" class="nav-link-text">
          {{ link.name }} <b class="caret"></b>
        </span>
      </template>
      <template v-else>
        <i :class="link.icon" ></i>
        <span :class="{'nav-link-text-dark' : Active === link.path || Active.includes(link.path)}" class="nav-link-text">{{ link.name }} <b class="caret"></b></span>
      </template>
    </a>
    <collapse-transition>
      <div
        v-if="$slots.default || this.isMenu"
        v-show="!collapsed"
        class="collapse show">
        <ul class="nav nav-sm flex-column" :class="{'active':isActive}">
          <slot></slot>
        </ul>
      </div>
    </collapse-transition>

   <slot
      name="title"
      v-if="children.length === 0 && !$slots.default && link.path">
      <component
        :to="link.path"
        @click.native="linkClick"
        :is="elementType(link, false)"
        class="nav-link"
        :class="{ active: link.active }"
        target="_blank"
        :href="link.path">
        <template v-if="addLink">
          <span :class="{'nav-link-text-dark' : Active === link.path || Active.includes(link.path)}" class="nav-link-text" >{{ link.name }}</span>
        </template>
        <template v-else>
          <i :class="link.icon"></i>
          <span :class="{'nav-link-text-dark' : Active === link.path || Active.includes(link.path)}" class="nav-link-text">{{ link.name }}</span>
        </template>
      </component>
    </slot>

  </component>

</template>
<script>
import { CollapseTransition } from 'vue2-transitions';


export default {
  name: 'sidebar-item',
  components: {
    CollapseTransition
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
      description:
        "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior."
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: '',
          path: '',
          children: []
        };
      },
      description:
        'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
    }
  },
  provide() {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild
    };
  },
  inject: {
    addLink: { default: null },
    removeLink: { default: null },
    autoClose: {
      default: true
    }
  },
  data() {
    return {
      children: [],
      collapsed: true
    };
  },
  computed: {
    baseComponent() {
      return this.isMenu || this.link.isRoute ? 'li' : 'router-link';
    },
    linkPrefix() {
      if (this.link.name) {
        let words = this.link.name.split(' ');
        return words.map(word => word.substring(0, 1)).join('');
      }
      return '';
    },
    isMenu() {
      return this.children.length > 0 || this.menu === true;
    },
    Active(){
      return this.$route.path
    },
    isActive() {
      if (this.$route && this.$route.path || this.$route.path.includes(`${this.$route}`)) {
        let matchingRoute = this.children.find(c => this.$route.path.startsWith(c.link.path));
         if (matchingRoute !== undefined) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    addChild(item) {
      const index = this.$slots.default.indexOf(item.$vnode);
      this.children.splice(index, 0, item);
    },
    removeChild(item) {
      const tabs = this.children;
      const index = tabs.indexOf(item);
      tabs.splice(index, 1);
    },
    elementType(link, isParent = true) {
      if (link.isRoute === false) {
        return isParent ? 'li' : 'a';
      } else {
        return 'router-link';
      }
    },
    linkAbbreviation(name) {
      const matches = name.match(/\b(\w)/g);
      return matches.join('');
    },
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    collapseMenu() {
      this.collapsed = !this.collapsed;
    },
    collapseSubMenu(link) {
      link.collapsed = !link.collapsed;
    }
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed;
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = false;
    }
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  }
};
</script>
<style scoped>

.active-page{
  background-color: #faa831;
  /*background-color: rgba(35, 99, 149, 0.37);*/
  /*background-color: white;*/
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);
}

.nav-link-text-dark{
  color:#236395;
}

.nav-link-text{
  color: white;
}

.fas{
  color: white;
}

.fa{
  color: white;
}


</style>
