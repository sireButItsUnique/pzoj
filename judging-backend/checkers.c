#include "checkers.h"

int default_checker(char *output, char *expected_output) {
	// return 0 if output is correct
	// tokenize output and expected_output - i.e. split by spaces and newlines
	int ret = 0;
	char **tok_output, **tok_expected_output;
	int ntok_output=0, ntok_expected_output=0;
	for (int i = 0; i < strlen(output); i++) {
		if (output[i] == '\n' || output[i] == ' ') ntok_output++;
		while (output[i] == '\n' || output[i] == ' ') i++;
	}
	for (int i = 0; i < strlen(expected_output); i++) {
		if (expected_output[i] == '\n' || expected_output[i] == ' ') ntok_expected_output++;
		while (expected_output[i] == '\n' || expected_output[i] == ' ') i++;
	}
	tok_output = (char**)malloc(sizeof(char*) * ntok_output);
	tok_expected_output = (char**)malloc(sizeof(char*) * ntok_expected_output);
	int j = 0;
	for (int i = 0; i < strlen(output); i++) {
		if (output[i] == '\n' || output[i] == ' ') {
			tok_output[j] = (char*)malloc(sizeof(char) * (i - j + 1));
			strncpy(tok_output[j], output + j, i - j);
			tok_output[j][i - j] = '\0';
			j = i + 1;
			while (output[i] == '\n' || output[i] == ' ') i++;
		}
	}
	j = 0;
	for (int i = 0; i < strlen(expected_output); i++) {
		if (expected_output[i] == '\n' || expected_output[i] == ' ') {
			tok_expected_output[j] = (char*)malloc(sizeof(char) * (i - j + 1));
			strncpy(tok_expected_output[j], expected_output + j, i - j);
			tok_expected_output[j][i - j] = '\0';
			j = i + 1;
			while (expected_output[i] == '\n' || expected_output[i] == ' ') i++;
		}
	}
	// check if number of tokens are same
	if (ntok_output != ntok_expected_output) {
		ret = 1;
	}
	else {
		// check if tokens are same
		for (int i = 0; i < ntok_output; i++) {
			if (strcmp(tok_output[i], tok_expected_output[i]) != 0) {
				ret = 1;
				break;
			}
		}
	}
	// free memory
	for (int i = 0; i < ntok_output; i++) {
		free(tok_output[i]);
	}
	for (int i = 0; i < ntok_expected_output; i++) {
		free(tok_expected_output[i]);
	}
	free(tok_output);
	free(tok_expected_output);
	return ret;
}