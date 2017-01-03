function get_options(option) {
    return Object.values(get_mapping_option(option));
}


function update_select_options(select_loc, option) {
    var select = $(select_loc);
    var options = get_options(option);

    select
        .find('option')
        .remove()
        .end();

    $.each(options, function(key, value) {
        select
            .append($("<option></option>")
                .attr("value", key)
                .text(value));
    });
}
