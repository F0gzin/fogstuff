const missing = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRF/wD/AAAAn6YU8gAAABFJREFUeJxjZPjPiBX9Z8SKAICzEAllY34TAAAAAElFTkSuQmCC";

export let assets = {
    images: {},
    fonts: {},
    texts: {}
};

export function loadImage(src) {
    return new Promise((resolve, reject__) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = ()=>{
            img.src = missing;
        };
    });
}

export function loadFont(src,fontName) {
    return new Promise((resolve, reject) => {
        const fnt = new FontFace(fontName,`url(${src})`);
        //fnt.src = src;
        document.fonts.add(fnt);
        fnt.onload = () => resolve(fnt);
        fnt.onerror = reject;
    });
}

export function loadText(src,textName) {
    return new Promise((resolve, reject) => {
        const response = fetch(src);
        response.then(function(f){
            resolve(f.text());
        },reject);
        return response;
    });
}

export function LoadAllAssets(assetsToLoad) {
    const imagePromises = Object.entries(assetsToLoad.images).map(([key, src]) =>
        loadImage(src).then(img => assets.images[key] = img)
    );
    const fontPromises = Object.entries(assetsToLoad.fonts).map(([key, src]) =>
        loadFont(src,key).then(fnt => {assets.fonts[key] = fnt; document.fonts.add(fnt);})
    );
    const textPromises = Object.entries(assetsToLoad.texts).map(([key, src]) =>
        loadText(src,key).then(txt => {assets.texts[key] = txt;})
    );

    return Promise.all([...imagePromises,...textPromises,fontPromises]);
}