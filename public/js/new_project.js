document.addEventListener("DOMContentLoaded", function () {
    const editor = new EditorJS({
        holder: 'editorjs-container',
        // Add your Editor.js configuration here
        // See Editor.js documentation for available options
        //include the tools 
        tools: {
            header: {
                class: Header,
                inlineToolbar: ['link']
            },
            list: {
                class: List,
                inlineToolbar: true
            },
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
            quote: {
                class: Quote,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+O',
                config: {
                    quotePlaceholder: 'Enter a quote',
                    captionPlaceholder: 'Quote\'s author',
                },
            },
            table: {
                class: Table,
                inlineToolbar: true,
                config: {
                    rows: 2,
                    cols: 3,
                },
            },
            image: SimpleImage,
            // image: {
            //     class: ImageTool,
            //     config: {
            //         endpoints: {
            //             byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
            //             byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            //         }
            //     }
            // },
        },
    });

    const saveButton = document.getElementById('save-button');

    saveButton.addEventListener('click', async () => {
        try {
            const savedData = await editor.save();

            const response = await fetch('/project/save-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(savedData),
            });

            if (response.ok) {
                console.log('Content saved successfully!');
            } else {
                console.error('Failed to save content.');
            }
        } catch (error) {
            console.error('Error saving content:', error);
        }
    });
});