export let assets = {
    images: {},
    fonts: {},
};

export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
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

export function LoadAllAssets(assetsToLoad) {
    const imagePromises = Object.entries(assetsToLoad.images).map(([key, src]) =>
        loadImage(src).then(img => assets.images[key] = img)
    );
    const fontPromises = Object.entries(assetsToLoad.fonts).map(([key, src]) =>
        loadFont(src,key).then(fnt => {assets.fonts[key] = fnt; document.fonts.add(fnt);})
    );

    return Promise.all([...imagePromises,fontPromises]);
}