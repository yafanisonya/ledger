<template>
  <layout>
    <div class="tags">
      <router-link v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`"
                   class="tag" >
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </layout>
</template>
<script lang="ts">

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Money/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component({
    components: {Button},
  })
  export default class Labels extends mixins(TagHelper){
    get tags(){
      return this.$store.state.tagList;
    }
    beforeCreate(){
      this.$store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
  .tags{
    background:white;
    font-size: 16px;
    padding-left: 16px;
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      svg{
        color:#666;
        margin-right: 16px;
      }
    }
  }
  .createTag-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }

</style>