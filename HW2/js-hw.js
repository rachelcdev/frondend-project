/*deepclone*/
array =[1,2,[3,4, [5,6,0]],4,[3,7],0];

var result = [];
/*DFS*/
function dsf(array,result){
  for (var i=0;i<array.length;i++){
    if(array[i] instanceof Object){
      dsf(array[i].slice(),result);
    }
    else{result.push(array[i])};
  }
  return result;
}
console.log(dsf(array,result));

/*BFS*/
var result = [];
function bsf(array,result){
  for (var i=0;i<array.length;i++){
    if(array[i] instanceof Object){
      console.log(array[i]);
      bsf(array[i].slice(),result);
    }
    else{result.unshift(array[i])};
  }
  return result;
}
console.log(bsf(array,result));


/* 3 sum */
var threeSum = function(nums) {
    nums.sort((a,b)=>(a-b));
    var result=[];
    if(nums===null||nums.length<3){
        return result;
    }
    for (var i=0;i<nums.length-2;i++){
        if(i>0 && nums[i]===nums[i-1]){
            continue;
        }
        var left = i+1,right=nums.length-1;
        var target = -nums[i];
       
        twoSum(nums,target,left,right,result)
    }
    return result;
};
    
function twoSum(nums, target,left,right,result) {
   
    while(left<right){
        if (nums[left]+nums[right]===target){
            
            result.push([-target,nums[left],nums[right]])
            left++;
            right--;
            while(left<right && nums[left]===nums[left-1]){
                left++;
            }
            while(left<right && nums[right]===nums[right+1]){
                right--;
            }
            
        } else if(nums[left]+nums[right] < target){
            left++;
        }
        else {
            right--;
        }
    }
};

/** permutation*/
/*DFS*/ 
var permute = function(nums) {
    var result = [];
    if(!nums.length){
        return result;
    }
    var visited =[];
    dfs(nums,[],result,visited);
    return result;
};

function dfs(nums,subset,result,visited){
    if(nums.length===subset.length){
        result.push(subset);
        return;
    }
    for (var i=0;i<nums.length;i++){
        if(visited[i]){
            continue;
        }
        subset.push(nums[i]);
        visited[i] = true;
        dfs(nums,subset.slice(),result,visited);
        subset.pop();
        visited[i] = false;
    }
}

/*Merge Intervals*/

var merge = function(intervals) {
    if(intervals.length<=1){
        return intervals;
    }
    intervals.sort((a,b)=>{
        if(a[0]>b[0]) return 1;
    if(a[0]<b[0]) return -1;
    return 0});
    var result = [];
    var oldInterval = intervals[0];
    for (var i = 1;i<intervals.length;i++){
        var currentInterval=intervals[i];
        if(oldInterval[1]>=currentInterval[0]){
            oldInterval[1] = Math.max(oldInterval[1],currentInterval[1]);
        }else{
            result.push(oldInterval);
            oldInterval = currentInterval;
        }
    }
    result.push(oldInterval);
    return result;
    
    
};

/*contiguous-array*/
var findMaxLength = function(nums) {
    var sum = 0;
    var map = {0:-1};
    var max = 0;
    for (var i=0;i<nums.length;i++){
        if(nums[i]===0){
            sum--;
        }else {
            sum++;
        }
        if(sum in map){
            max = Math.max(max,i-map[sum])
        }else{
            map[sum]=i;
           
        }
    }
    return max;
};
/* Zigzag-conversion */
var convert = function(s, numRows) {
    var arr = [];
    if(numRows<=1){
        return s;
    }
    for(var i =0;i<numRows;i++){
        arr[i] = '';
    }
    for (var i=0;i<s.length;i++){
        var index = i % (2*numRows-2);
        index = index<numRows?index:2*numRows-2-index;
        arr[index]= arr[index]+s[i];
    }
    var newarr = arr.join('');
    return newarr;
};

/*132 pattern*/
var find132pattern = function(nums) {
    
    var stack = [];
    var second = Number.NEGATIVE_INFINITY;
    for(var i=nums.length-1;i>=0;i--){
        
        if(nums[i]<second){
            return true;
        }
        else{
            while(stack.length!==0 && stack[stack.length-1]<nums[i]){
               
                // find second max of pattern
                second=stack.pop();  
               
            }
        }
        stack.push(nums[i]);
       
    }
    return false;
    
    
};