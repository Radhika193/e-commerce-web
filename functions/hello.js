let arr=[1,2,3,4];
arr.forEach((val,idx,arr)=>{
    arr[idx]=val*val;
    console.log(arr[idx]);
})