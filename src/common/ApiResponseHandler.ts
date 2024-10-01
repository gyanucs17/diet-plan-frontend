export const handleApiError = (error: any, message: string , setError: React.Dispatch<React.SetStateAction<string>>) => {

    const _content = (error.response && error.response.data) || error.message || error.toString();
    console.error('Error Occured:' + _content);
    // Set the error state
    setError(message);
};

export const handelResponse = (response: any, message: string, setMessag: React.Dispatch<React.SetStateAction<string>>) =>{
    if(response.data.status === "Unauthorized"){
        localStorage.removeItem("user");
        window.location.reload()
    }
    if(response.data.status === "failed")
        setMessag(response.data.message);

    if(response.data.status === "success"){
        if(message !== "")
            setMessag(message);
        return true;
    }
    return false;
}

export const handelFetchResponse = (response: any, setMessag: React.Dispatch<React.SetStateAction<string>>) =>{
    if(response.data.status === "Unauthorized"){
        localStorage.removeItem("user");
        window.location.reload()
    }
    if(response.data.status === "failed")
        setMessag(response.data.message);

    if(response.data.status === "success"){
        return true;
    }
    return false;
}
