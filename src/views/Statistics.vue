<template>
  <layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"></Tabs>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}&nbsp;{{week(group.title)}}
          <span>￥{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from "dayjs";
  import clone from '@/lib/clone';

  @Component({
    components:{Tabs},
  })
  export default class Statistics extends Vue{
    tagString(tags: Tag[]){
      return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
    }

    beautify(string: string){
      const day = dayjs(string);
      const now = dayjs();
      if(day.isSame(now,'year')){
        return day.format('M月D日');
      }else{
        return day.format('YYYY年M月D日')
      }
    }
    week(string: string){
      const weekday = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
      const day = dayjs(string).day();
      return weekday[day];
    }

    get recordList(){
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const recordList = this.recordList;
      if(recordList.length === 0 ){return [];}
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

      if(newList.length === 0){return [] as Result;}
      type Result = { total?: number, title: string, items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}];
      for(let i=1;i<newList.length;i++){
        const current = newList[i];
        const last = result[result.length -1];
        if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
          last.items.push(current);
        }else{
          result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum,item) => {
          return Math.round((sum + item.amount)*100)/100;
        },0);
      });
      return result;
    }

    beforeCreate(){
      this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  .noResult{
    padding: 16px;
    text-align: center;
  }
  ::v-deep {
    .type-tabs-item {
      background: #c4c4c4;
      &.selected{
        background: white;
        &::after{
          display: none;
        }
      }
    }
    .interval-tabs-item{
      height: 48px;
    }
  }
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>