import $ from "jquery"

export const Switch = ({handleSwitchClick}) => {
    const switchTheme = () => {
        $(".switch__con .icon").toggleClass("dark");
        $("#app").toggleClass("light");
        handleSwitchClick();
    }

	const darkThmeIsActiv = () => {
		let darkThmeIsActiv = true;
		// let preferredThemeIsDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if($(".app.light").length === 1) {
			darkThmeIsActiv = false;
		} 
		return darkThmeIsActiv;
	}
    return (
        <>
            <div className="switch" onClick={switchTheme}>
                <div className="switch__con">
					<span className={"icon ".concat(darkThmeIsActiv() ? "dark" : "")}>&#9788;</span>
                </div>
            </div>
        </>
    );
}