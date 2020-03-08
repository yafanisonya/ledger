const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  clone(data: RecordItem[] | RecordItem){
    return JSON.parse(JSON.stringify(data));
  },
  fetch(){
    //const x: RecordItem[] = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    //return x;
    //return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  save(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data));
  }
};

export default recordListModel;