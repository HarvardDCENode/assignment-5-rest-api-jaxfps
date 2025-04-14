(function(){

    const baseURL = 'http://45.55.59.58:8080'; //  for development, it's http://localhost:3030
 
    async function testAPIs(){
     // test list first
     let testId = '';
     let testJSON = {};
     try{
         // list
         let list = await callAPI('GET', '/api/Players', null, null)
         console.log('\n\n**************\nlist results:');
         console.log(list);
         
         // create form data object with Player and metadata
         // This section is for uploading a file to the REST API
         var data = {
            "playerName":"API test player",
            "playerTeam":"API test team"
         }
         console.log(data);
         
         // If you don't have a file upload component to your application, a simple JSON object will do
         /*
         let data = {
           "title": "My API Test Title",
           "description": "This is an AJAX API test"
         }
         */
         
         // create
         let newPlayer = await callAPI('POST', '/api/players', null, data);
         console.log('\n\n***************\ncreate results:');
         console.log(newPlayer);
         
         // find
         let retreivedNewPlayer = await callAPI('GET','/api/players/'+newPlayer.playerName, null, null)
         console.log('\n\n**************\nfind results:');
         console.log(retreivedNewPlayer);
 
         // update description
         retreivedNewPlayer.description += ' appended by the AJAX API ';
         let updatedPlayer = await callAPI('PUT','/api/players/'+retreivedNewPlayer.playerName, null, retreivedNewPlayer)
         console.log('\n\n*************\nupdate results:');
         console.log(updatedPlayer);
         
         // now find again to confirm that the description update was changed
         let retreivedUpdatedPlayer = await callAPI('GET','/api/players/'+updatedPlayer.playerName, null, null)
         console.log('\n\n*************\nfind results (should contain updated description field):');
         console.log(retreivedUpdatedPlayer);
 
         //delete
         let deletedPlayer = await callAPI('DELETE', '/api/players/'+retreivedUpdatedPlayer.playerName, null, null)
         console.log(deletedPlayer);
 
     
     } catch(err) {
         console.error(err);
     };
   }//end testAPIs
 
   async function callAPI(method, uri, params, body) {
     const jsonMimeType = {
       'Content-Type': 'application/json' // Ensure the Content-Type is set to JSON
     };
     try {
       const response = await fetch(baseURL + uri, {
         method: method,
         headers: jsonMimeType, // Always include the Content-Type header
         body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : null // Stringify the body for POST/PUT
       });

       // Check if the response is JSON
       const contentType = response.headers.get('Content-Type');
       if (contentType && contentType.includes('application/json')) {
         return await response.json();
       } else {
         throw new Error('Response is not JSON');
       }
     } catch (err) {
       console.error('Error in callAPI:', err);
       return { status: 'error', message: err.message };
     }
   }
       
 
   // Calls our test function when we click the button
   //  afer validating that there's a file selected.
   document.querySelector('#testme').addEventListener("click", ()=>{

      
       testAPIs();
    
   });
 })();