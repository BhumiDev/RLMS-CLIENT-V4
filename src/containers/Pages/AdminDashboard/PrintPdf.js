import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function PrintButton({ refsToPrint }) {
    const deepCloneWithStyles = (node) => {
        const style = document.defaultView.getComputedStyle(node, null);
        const clone = node.cloneNode(false);
        if (clone.style && style.cssText) clone.style.cssText = style.cssText;
        for (let child of node.childNodes) {
            if (child.nodeType === 1)
                clone.appendChild(deepCloneWithStyles(child));
            else clone.appendChild(child.cloneNode(false));
        }
        return clone;
    };

    const printFunction = () => {
        const printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write(
            "<html><head><title>Student Scorecard</title></head><body id='print-body'>"
        );
        const body = printWindow.document.getElementById('print-body');
        refsToPrint.map((ref) => {
            const clone = deepCloneWithStyles(ref.current);
            return body.appendChild(clone);
        });
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Button
            onClick={printFunction}
            m="10px"
            //   variant="contained"
            style={{ textTransform: 'none' }}
            startIcon={<DownloadIcon />}
        >
            Download scorecard
        </Button>
    );
}

export default PrintButton;
