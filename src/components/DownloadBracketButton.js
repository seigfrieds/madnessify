import "./DownloadBracketButton.css";

import domtoimage from 'dom-to-image';

function DownloadBracketButton()
{
    function download()
    {
        domtoimage.toJpeg(document.getElementById("container"))
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = "bracket.jpeg";
                link.href = dataUrl;
                link.click();
            });
    }

    return (
        <button onClick={download}>
            Download your bracket to share with friends!
        </button>
    );
}

export default DownloadBracketButton;