import React, { useState, useRef, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Container,
	Grid,
	Paper,
	Box,
	Button,
	Input,
	TextField,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(2, 1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	box: {
		display: "flex",
	},
	inputFile: { lineHeight: "52px" },
}))

export default function App() {
	const classes = useStyles()
	const [image, setImage] = useState(null)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const canvasRef = useRef(null)
	const imageEl = useRef(null)
	const handleUploadClick = (event) => {
		var file = event.target.files[0]
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = function (e) {
			setImage(reader.result)
		}.bind(this)
	}
	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}
	const handleDescriptionChange = (event) => {
		setDescription(event.target.value)
	}
	useEffect(() => {
		let ctx = canvasRef.current.getContext("2d")
		let [w, h] = [canvasRef.current.width, canvasRef.current.height]
		ctx.clearRect(0, 0, w, h)

		ctx.save()
		ctx.drawImage(imageEl.current, 0, 0, 600, 600)
		ctx.font = "30px Arial"
		ctx.fillText(title, 200, 50)
		ctx.fillText(description, 200, ctx.canvas.height - 50)

		ctx.restore()
	})
	return (
		<div className={classes.root}>
			<Container maxWidth='sm'>
				<Paper elevation={2} className={classes.paper}>
					<Box className={classes.box}>
						<TextField
							type='text'
							variant='outlined'
							placeholder='Add title'
							onChange={handleTitleChange}
						/>
						<TextField
							type='text'
							variant='outlined'
							placeholder='Add description'
							onChange={handleDescriptionChange}
						/>
						<input
							accept='image/*'
							id='contained-button-file'
							multiple
							type='file'
							className={classes.inputFile}
							onChange={handleUploadClick}
						/>
					</Box>
					<Box>
						<canvas
							className={classes.canvas}
							ref={canvasRef}
							width={500}
							height={500}
						/>
					</Box>
					<img
						src={image}
						ref={imageEl}
						style={{ display: "none" }}
					/>
				</Paper>
			</Container>
		</div>
	)
}
