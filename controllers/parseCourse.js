parseCourseIntoSections = (course) => {

    let startingCursor = 0;
    let endingCursor = 0;
    let contentStartingCursor = 0;
    let contentEndingCursor = 0;
    let tempH1 = 0;
    let title = "";
    let titleContent = "";

    const sections = [];
    

    //Continue searching for tags until there's no more tag
    while (true) {
        //Find the starting location for the next h1
        startingCursor = course.indexOf("<h1>", endingCursor);

        //There are no more tags so break out of the loop
        if (startingCursor == -1) {
            break;
        }


        //Find the ending location for the h1
        endingCursor = course.indexOf("</h1>", startingCursor);

        //Using the starting and ending location for the h1 create a new section
        let title = course.substring(startingCursor + 4, endingCursor);
        let titleContent = "";

        //Create a new section
        const section = {
            title: title,
            content: titleContent
        };

        
        tempH1 = course.indexOf("<h1>", endingCursor);
        //Check if we're at the last section of the course
        if(tempH1 == -1){
            tempH1 = course.length;
        }


        //Find all <p> tags between this tag and the next h1
        while (true) {
            //Find the starting and ending tag for each h1
            contentStartingCursor = course.indexOf("<p>", contentEndingCursor);

            //There are no more tags so break out of the loop
            if (contentStartingCursor > tempH1 || contentStartingCursor == -1) {
                break;
            }

            contentEndingCursor = course.indexOf("</p>", contentStartingCursor);

            titleContent += course.substring(contentStartingCursor + 3, contentEndingCursor);
            titleContent += "\n";

        }

        //Assign the title content to the corresponding section
        section.content = titleContent;


        //Push the new section to all sections
        sections.push(section)
    }

    return sections;

}

module.exports = parseCourseIntoSections;