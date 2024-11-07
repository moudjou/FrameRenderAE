function renderCurrentFrameUI(thisObj) {
    var panel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Render Current Frame" );

    
   

    var renderButton = panel.add("button", undefined, "Render Frame as PNG");

    function renderCurrentFrameAsPNG() {
        var comp = app.project.activeItem;

        if (comp == null || !(comp instanceof CompItem)) {
            alert("Please select an active composition.");
            return;
        }

        var currentTime = comp.time;

        var renderQueue = app.project.renderQueue;
        var renderItem = renderQueue.items.add(comp);

        var outputModule = renderItem.outputModule(1);
        outputModule.file = new File("~/Desktop/CurrentFrame.png"); 
        outputModule.format = "PNG";

        renderItem.timeSpanStart = currentTime;
        renderItem.timeSpanDuration = 1 / comp.frameRate; 

        app.beginUndoGroup("Render Current Frame as PNG");
        renderQueue.render();
        app.endUndoGroup();

        alert("Current frame rendered as PNG on Desktop.");
    }

    renderButton.onClick = renderCurrentFrameAsPNG;

    if (panel instanceof Window) {
        panel.center();
        panel.show();
    }
    return panel;
}

renderCurrentFrameUI(this);
