import domtoimage from 'dom-to-image';

function DownloadBracketButton()
{
    function download()
    {
        domtoimage.toJpeg(document.getElementById("container"), { style: {position:"absolute",left: "50%",top:"50%",textAlign: "center",transform: "translate(-66.5%, -48.5%)" }})
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = "bracket.jpeg";
                link.href = dataUrl;
                link.click();
            });
    }

    return (
        <button onClick={download}>
            Download your bracket!
        </button>
    );
}

export default DownloadBracketButton;