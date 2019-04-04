function testUrl(url){
    const checkReference = /(https?:\/\/)(www.)?[0-9a-z_.-]+.[\w.]{2,5}\/?$/i;
    return checkReference.test(url);
}

export {testUrl}