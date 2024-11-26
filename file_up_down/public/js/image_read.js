const readURL = (file) => {
    const f = file.files[0];
    console.log(f)
    if(f != ""){
        let reader = new FileReader();
        reader.readAsDataURL(f)
        reader.onload = (e) => {
            document.querySelector("#preview").src = e.target.result
        }
    }
}