<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">
        <Icon name="delete"></Icon>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="ok" class="ok">确定</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  @Component
  export default class NumberPad extends Vue{
    @Prop(Number) readonly value!: number;
    output = this.value.toString();

    inputContent(event: MouseEvent){
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent as string;
      if(this.output.indexOf('.') == -1 ){
        if( this.output.length === 6 ){return window.alert('输入金额不能大于1,000,000')}
      }else{
        if (this.output.indexOf('.') == this.output.length - 3){return window.alert('请输入小数点后两位金额 0.01-0.99')}
      }
      // 显示框为0，若输入1-9则直接替换；若输入点则追加
      if(this.output === '0'){
        if('0123456789'.indexOf(input) >= 0){
          this.output = input;
        }else{
          this.output += input;
        }
        return;
      }
      if(this.output.indexOf('.')>=0 && input === '.'){return;}  // 排除存在一个点还能继续输入点的情况
      this.output += input;
    }
    remove(){
      if(this.output.length === 1){
        this.output = '0';
      }else{
        this.output = this.output.slice(0,-1);
      }
    }
    ok(){
      const number = parseFloat(this.output);
      this.$emit('update:value',number);
      this.$emit('submit',number);
      this.output = '0';
    }
    }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad{
    .output{
      @extend %clearFix;
      @extend %innerShadow;
      font-size:32px;//36px;
      font-family:Consolas,monospace;
      padding:4px 8px;  // 9px 16px;
      text-align:right;
      height: 56px; //72px;
    }
    .buttons{
      @extend %clearFix;
      > button{
        width: 25%;
        height: 56px;//64px;
        float: left;
        background: transparent;
        border: none;
        > .icon{
          width: 24px;
          height: 24px;
          color: #000;
        }
        &.ok{
          height: 56*3px;//64*3px;
          float: right;
        }
        &.zero{
          width:25*2%;
        }
        $bg:#f2f2f2;
        &:nth-child(1) {
          background: $bg;
        }
        &:nth-child(2),&:nth-child(5){
          background: darken($bg,4%);
        }
        &:nth-child(3),&:nth-child(6),&:nth-child(9){
          background: darken($bg,4%*2);
        }
        &:nth-child(4),&:nth-child(7),&:nth-child(10),&:nth-child(12){
          background: darken($bg,4%*3);
        }
        &:nth-child(11){
          background: darken($bg,4%*4);
        }
        &:nth-child(8),&:nth-child(13){
          background: darken($bg,4%*5);
        }
      }
    }
  }
</style>