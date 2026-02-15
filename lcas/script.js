large_cardinals = [
    "correct",
    "worldly",
    "otherworldly",
    "totally otherworldly",
    "weakly inaccessible",
    "strongly inaccessible",
    "weakly hyperinaccessible",
    "strongly hyperinaccessible",
    "reflecting",
    "pseudo uplifting",
    "uplifting",
    "weakly mahlo",
    "strongly mahlo",
    "weakly hyper-mahlo",
    "strongly hyper-mahlo",
    "weakly compact",
    "totally indescribable",
    "reducible",
    "shrewd",
    "unfoldable",
    "long unfoldable",
    "strongly unfoldable",
    "weakly superstrong",
    "weakly almost huge",
    "strongly uplifting",
    "ethereal",
    "subtle",
    "weakly ineffable",
    "ineffable",
    "completely ineffable",
    "weakly ramsey",
    "super weakly ramsey",
    "remarkable",
    "virtually measurable",
    "virtually extendible",
    "completely remarkable",
    "virtually shelah for supercompactness",
    "virtually rank-into-rank",
    "silver",
    "zero sharp",
    "almost ramsey",
    "greatly erdos",
    "virtually ramsey",
    "jonsson",
    "rowbottom",
    "ramsey",
    "completely ramsey",
    "super completely ramsey",
    "almost fully ramsey",
    "strongly ramsey",
    "super ramsey",
    "fully ramsey",
    "strategic fully ramsey",
    "weakly measurable",
    "measurable",
    "zero dagger",
    "tall",
    "strong",
    "strongly tall",
    "woodin",
    "shelah",
    "superstrong",
    "subcompact",
    "nearly strongly compact",
    "nearly supercompact",
    "strongly compact",
    "supercompact",
    "enhanced supercompact",
    "hypercompact",
    "woodin for strong compactness",
    "extendible",
    "vopenka",
    "shelah for supercompactness",
    "almost high-jump",
    "high-jump",
    "super high-jump",
    "high-jump with unbounded excess closure",
    "almost huge",
    "huge",
    "huge*",
    "super almost huge",
    "superhuge",
    "ultrahuge",
    "i3",
    "ie",
    "i2",
    "i1",
    "i0",
    "weakly reinhardt",
    "reinhardt",
    "super reinhardt",
    "totally reinhardt",
    "rank-berkeley",
    "berkeley",
    "club berkeley",
    "limit club berkeley",
    "superlatively ramsey"
];

have = [];

function formatSeconds (secs) {
    const pad = (n) => n < 10 ? `0${n}` : n;

    const h = Math.floor(secs / 3600);
    const m = Math.floor(secs / 60) - (h * 60);
    const s = Math.floor(secs - h * 3600 - m * 60);

    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

var time = 60;

setInterval(timer, 1000);

function timer() {
    time--;
    document.getElementById("timer").innerHTML = formatSeconds(time);
}

addEventListener("change", (event) => {
    var _content = event.target.value;
    var content = _content.toLowerCase().normalize("NFKD").replace(/[^\w\s.-_\/]/g, "").trim();
    if (large_cardinals.includes(content)) {
	if (have.includes(content)) {
	    document.getElementById("message").innerText = `You already have: \"${_content}\"`;
	} else {
	    document.getElementById("message").innerText = "";
	    console.log("Yay!");
	    have.push(content);

	    document.getElementById("list").innerHTML = have.map((has) => {
		return `<li>${has}</li>`;
	    }).join('');

	    time += 10;
	}
    } else {
	document.getElementById("message").innerText = `Unrecognized large cardinal: \"${_content}\"`;
    }
});
