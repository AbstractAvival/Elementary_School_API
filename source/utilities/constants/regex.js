const regex = Object.freeze( {
	address_regex: '^[a-zA-ZÀ-ž0-9,.\' ]*$',
	comment_regex: '^[a-zA-ZÀ-ž0-9!\/,\'\\?\\n._ :+#\-]*$',
	date_regex: '^[0-9\-: ]*$',
	email_regex: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]$',
	general_use_regex: '^[a-zA-ZÀ-ž0-9!\/,\'\\?._ :+#\-]*$',
	general_use_regex_no_numbers: '^[a-zA-ZÀ-ž!\/,\'\\?._ :+#\-]*$',
    id_regex: '^[a-zA-ZÀ-ž0-9\-_.]*$',
	name_regex: '^[a-zA-ZÀ-ž ]*$',
    only_letters_regex: '^[a-zA-ZÀ-ž ]*$',
	password_regex: '^[a-zA-ZÀ-ž0-9!@#\$%\^\&*\-+._]*$',
	phone_regex: '^[0-9+ ]*$',
	time_regex: '^[0-9:]*$',
	year_regex: '^[0-9\-]*$',
} )

module.exports = { regex }
