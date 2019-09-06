var arr = [];
var state;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
randomArray();
state = 'ready';



function stop(){
	if(state == 'running'){
		state = 'stopping';
	}
}

function reset(){
	if(state == 'ready'){
		randomArray();
		
	} else{
		state ='resetting';
	}
}
function play(){
	if(state == 'ready'){
		state = 'running';
		sortArray();
	}
}
function setSize(){
	if(state =='ready'){
		randomArray();
	}else{
		$('#changeSize').show();
		window.setTimeout(function () {$("#changeSize").alert('close'); }, 2500);
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function getSpeed(){
	return 500/document.getElementById("speedSlider").value;
}

function highlight(pos,color){
	let size = arr.length;
	ctx.clearRect((pos*c.width/size),0,(c.width/size),c.height*arr[pos]/size);
	ctx.fillStyle = color;
	ctx.fillRect((pos*c.width/size),0,(c.width/size)-1,c.height*arr[pos]/size);
}


function displayArray(){
	let size = arr.length;
	ctx.clearRect(0, 0, c.width, c.height);
	for(let i=0;i<arr.length;i++){
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.rect((i*c.width/size),0,(c.width/size)-1,c.height*arr[i]/size);
		ctx.fill();
	}
}



async function sortArray(){
	if(document.getElementById("Algos").innerHTML == 'Selection Sort'){	
		await selectionSort();
	}else if(document.getElementById("Algos").innerHTML == 'Insertion Sort'){
		await insertionSort();
	}else if(document.getElementById("Algos").innerHTML == 'Merge Sort'){
		await mergeSort(0,arr.length-1);
	}
	else if(document.getElementById("Algos").innerHTML == 'Quick Sort'){
		await quickSort(0, arr.length-1);
	}else if(document.getElementById("Algos").innerHTML == 'Radix Sort'){
		await radixSort();
	}else{
		$('#unselected').show(); 
		window.setTimeout(function () {$("#unselected").alert('close'); }, 2500);
	}
	if(state == 'resetting')
		randomArray();
	state = 'ready';
	displayArray();
  	 
}

function selectAlgorithm(algo){
	document.getElementById("Algos").innerHTML = algo;
}


function randomArray(){
	let array = [];
	let size = document.getElementById("sizeSlider").value;
	for(let i=1;i<=size;i++){
		array.push(i);
	}

	arr = [];
	while(array.length>0){
		let index = Math.floor(Math.random()*array.length);
		arr.push(array[index]);
		array.splice(index,1);
	}
	displayArray();
}



async function selectionSort(){
	let n = arr.length;
	for (let i = 0; i < n-1; i++) 
        { 
            // Find the minimum element in unsorted array 
            let min_idx = i;

            for (let j = i+1; j < n; j++){
            	if(state == 'stopping' || state == 'resetting'){
            		return;
            	}else{
	            	displayArray();
	            	highlight(min_idx,'darkgreen');
	            	highlight(i,'purple');
	            	highlight(j,'darkorange');

	                if (arr[j] < arr[min_idx]){
	                	highlight(j,'green');
	                	highlight(min_idx,'black');
	                	highlight(i,'purple');
	                    min_idx = j;
	                }
	                await sleep(getSpeed());
           		}
  			}
            // Swap the found minimum element with the first 
            // element
            let temp = arr[min_idx]; 
            arr[min_idx] = arr[i]; 
            arr[i] = temp; 
        } 
}


async function insertionSort() {
  
	for(let i =1;i<arr.length;i++){
		if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
			displayArray();
			highlight(i,'purple');
			let j = i-1;
			while(arr[j]>arr[i]){
				highlight(j,'darkorange');
				await sleep(getSpeed());
				highlight(j,'black');
				j--;
			}
			highlight(Math.max(j),'darkgreen');
			await sleep(getSpeed());
			let temp = arr[i];
			displayArray();
			arr.splice(j+1, 0, temp);
			arr.splice(i+1, 1);
		
		}
	}
	
}

async function mergeSort(l,r) {
	displayArray();
	highlight(l,'purple');
	highlight(r,'purple');
	await sleep(getSpeed());
	let m = Math.floor((l+r)/2);
	if(r>l){
    	if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
			
			await mergeSort(l,m);
		}
		if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
    		await mergeSort(m+1,r);
    	}
    	if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
    		await merge(l,m,r);
    	}
	}
}

async function merge(l,m,r){
	displayArray();
	highlight(l,'purple');
	highlight(r,'purple');
	await sleep(getSpeed());
	let n1 = m - l + 1; 
    let n2 = r - m;

    let L = []; 
    let R = [];
    
    for (let i=0; i<n1; ++i){
    	if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
	    	displayArray();
			highlight(l,'purple');
			highlight(r,'purple');
			highlight(l+i,'darkorange');
			await sleep(getSpeed());

	       	L[i] = arr[l + i];
	    } 
       }
   	for (let j=0; j<n2; ++j){
   		if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
	   		displayArray();
			highlight(l,'purple');
			highlight(r,'purple');
			highlight(m+1+j,'darkorange');
			await sleep(getSpeed());

	        R[j] = arr[m + 1+ j]; 
	    } 
   	}

    let i=0,j=0;
    let k = l; 
    while (i < n1 && j < n2) {
    	if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
	    	displayArray();
			highlight(l,'purple');
			highlight(r,'purple');
			 
	        if (L[i] <= R[j]){
	        	highlight(k,'green');
	            arr[k] = L[i]; 
	            i++; 
	        } 
	        else{
	        	highlight(k,'green');
	            arr[k] = R[j]; 
	            j++;
	        } 
	        k++;
	       await sleep(getSpeed());
	   }
	}

    while (i < n1){
    	if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
	        arr[k] = L[i];
	        displayArray();
			highlight(l,'purple');
			highlight(r,'purple');
	        highlight(k,'green');
	        await sleep(getSpeed());
	        i++; 
	        k++;
	    }
        
    }

    while (j < n2){ 
    	if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
	        arr[k] = R[j];
	        displayArray();
			highlight(l,'purple');
			highlight(r,'purple');
	        highlight(k,'green');
	        await sleep(getSpeed()); 
	        j++; 
	        k++;
	    }
        	  
    }
}

async function quickSort(low, high){
    if (low < high){
        /* pi is partitioning index, arr[pi] is now
           at right place */
        let pi;
        if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
        	pi = await partition(low, high);
        }
        if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
    		await quickSort(low, pi - 1);  // Before pi
        }
        if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
    		await quickSort(pi + 1, high); // After pi
    	}
    }
}

async function partition (low, high){
    // pivot (Element to be placed at right position)
    let pivot = arr[high];
 
    let i = (low - 1);  // Index of smaller element

    for (j = low; j < high; j++){
        // If current element is smaller than the pivot
        if(state == 'stopping' || state == 'resetting'){
    		return;
    	}else{
	        displayArray();
			highlight(j,'darkorange');
			highlight(i,'purple');
	        if (arr[j] < pivot){
	   			highlight(j,'green');
	        	 
	            i++;    // increment index of smaller element
	            let temp = arr[i];
	            arr[i]= arr[j];
	            arr[j] = temp;
	        }
	        await sleep(getSpeed());
	    }
    }
    let temp = arr[i+1];
    arr[i+1]= arr[high];
    arr[high] = temp;
    return (i + 1);
}

async function radixSort(){
	 // Find the maximum number to know number of digits 
    let max = arr.length; 

    // Do counting sort for every digit. Note that instead 
    // of passing digit number, exp is passed. exp is 10^i 
    // where i is current digit number 
    for (let exp = 1; Math.floor(max/exp) > 0; exp *= 10) 
        if(state == 'stopping' || state == 'resetting'){
		return;
	}else{
		await radixCount(arr.length, exp); 
	}
}

async function radixCount(n,exp){
	 let output = []; // output array 
        let i; 
        let count =  [0,0,0,0,0,0,0,0,0,0];

        // Store count of occurrences in count[] 
        for (i = 0; i < n; i++) 
            count[Math.floor(arr[i]/exp)%10]++; 
  
        // Change count[i] so that count[i] now contains 
        // actual position of this digit in output[] 
        for (i = 1; i < 10; i++) 
            count[i] += count[i - 1]; 
        // Build the output array 
        for (i = n - 1; i >= 0; i--) 
        { 
        	if(state == 'stopping' || state == 'resetting'){
    			return;
	    	}else{
	        	displayArray();
				highlight(i,'darkorange');
				await sleep(getSpeed()/4);
	            output[count[ Math.floor(arr[i]/exp)%10 ] - 1] = arr[i]; 
	            count[ Math.floor(arr[i]/exp)%10 ]--; 
	        }
        } 
  
        // Copy the output array to arr[], so that arr[] now 
        // contains sorted numbers according to curent digit 
        for (i = 0; i < n; i++){
        	if(state == 'stopping' || state == 'resetting'){
    			return;
	    	}else{
	        	displayArray();
				highlight(i,'green');
				await sleep(getSpeed());
	            arr[i] = output[i]; 
	        }
	    }
  }