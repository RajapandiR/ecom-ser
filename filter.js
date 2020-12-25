


if(flrName != '' && fltColor != ''){
	const filter = { $and:[{ name: flrName}, { $and:[{ color: flrColor}, ]

	}
}else if(flrName == '' && fltColor != ''){
	const filter = { $and:[{ color: flrColor}, ]

} else{
	const filter = { $and:[{ name: flrName}, ]
}