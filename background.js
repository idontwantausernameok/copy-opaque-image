browser.menus.create({
	id: "copy-opaque-image",
	title: browser.i18n.getMessage("extensionName"),
	contexts: ["image"]
})

browser.menus.onClicked.addListener((info, tab) => {
	if (info.menuItemId == "copy-opaque-image") {
		const image = new Image()
		image.onload = () => {
			var canvas = document.createElement('canvas')
			canvas.width = image.naturalWidth
			canvas.height = image.naturalHeight
			ctx = canvas.getContext('2d')
			ctx.fillStyle = 'white'
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			ctx.drawImage(image, 0, 0)

			canvas.toBlob(blob => {
				const reader = new FileReader()
				reader.addEventListener('loadend', () => {
					browser.clipboard.setImageData(reader.result, 'png')
				})
				reader.readAsArrayBuffer(blob)
			}, 'image/png')
		}
		image.src = info.srcUrl
	}
});