<template>
  <layout class-prefix="layout">
    {{recordList}}
    <NumberPad :value="record.amount" @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';

  const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
  }
  @Component({
    components:{NumberPad,Types,Notes,Tags}
  })
  export default class Money extends Vue{
    tags = ['餐饮','购物','交通','娱乐'];
    recordList: Record[] = recordList;
    record: Record = {
      tags:[], notes:'', type:'-', amount:0
    };
    onUpdateNotes(value: string){
      this.record.notes = value;
    }
    onUpdateTags(value: string[]){
      this.record.tags = value;
    }
    // onUpdateType(value: string){
    //   this.record.type = value;
    // }
    onUpdateAmount(value: string){
      this.record.amount = parseFloat(value);
    }
    saveRecord(){
      const record2: Record = JSON.parse(JSON.stringify(this.record));
      record2.createdAt = new Date();
      this.recordList.push(record2)
    }
    @Watch('recordList')
    onRecordListChange(){
      window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
    }
  }

</script>
<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>