<template>
<ul class="btn-group">
  <li @click="toggleMenu()" class="dropdown-toggle" v-if="selectedOption.name">
    <span class="title">{{ selectedOption.name }}</span>
    <span class="caret"></span>
  </li>
  <li>
    <ul class="dropdown-menu" :class="{ 'hide' : !showMenu}">
      <li v-for="(option, index) in options" :key="index" :class="{disabled: option.disabled}">
        <span @click="updateOption(option)">
          {{ option.name }}
        </span>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
export default {
  data () {
    return {
      selectedOption: {
        name: ''
      },
      showMenu: false
    }
  },
  props: {
    options: {
      type: [Array, Object]
    },
    selected: {}
  },

  mounted () {
    this.selectedOption = this.selected
  },

  methods: {
    updateOption (option) {
      if (!option.disabled) {
        this.selectedOption = option
        this.showMenu = false
        this.$emit('updateOption', this.selectedOption)
      }
    },

    toggleMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-group {
    height: 36px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    a {
      &:hover {
        text-decoration: none;
      }
    }
    .title {
      flex: 1;
      text-align: center;
    }
  }

  .dropdown-toggle {
    color: #636b6f;
    min-width: 100px;
    height: 36px;
    padding: 0 10px;
    background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
    background-size: 0 2px, 100% 1px;
    background-repeat: no-repeat;
    background-position: center bottom, center calc(100% - 1px);
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      background: #e1e1e1;
      cursor: pointer;
    }

    .caret {
      display: inline-block;
      width: 0;
      position: relative;
      height: 0;
      margin-left: 2px;
      vertical-align: middle;
      border-top: 4px dashed;
      border-top: 4px solid \9;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
  }

  .hide {
    display: none;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: -8px;
    z-index: 1000;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-clip: padding-box;

    li {
      overflow: hidden;
      width: 100%;
      position: relative;
      margin: 0;

      &.disabled {
        @include disabled;
        span {
          &:hover {
            background: inherit;
            color: inherit;
          }
        }
      }

      span {
        padding: 10px 30px;
        display: block;
        clear: both;
        font-weight: normal;
        line-height: 1.6;
        color: #333333;
        white-space: nowrap;
        text-decoration: none;

        &:hover {
          background: #efefef;
          color: #409FCB;
        }
      }
    }
  }
</style>
