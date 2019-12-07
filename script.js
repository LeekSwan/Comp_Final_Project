export const renderSite = function() {
    const $root = $('#root');
    
    
 
    //here is where you will add button handlers, and any extra stuff you need to link to your async helper functions. You can also do this directly in the main function but its not recommended.
 
}
 
$(function () {
    renderSite(); 
}); 

export async function getUserHomeInfo() {
    const $root = $('#root');
    const result = await axios({
        method: 'put',
        url: 'http://localhost:3000/public/users'

    })

    $root.append(section);
}
