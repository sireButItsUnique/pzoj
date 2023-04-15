#include <string.h>
#include <stdlib.h>

/**
 * @brief Default checker
 * @details Tokenizes output and expected output and compares them - extra newlines/whitespaces are ignored
 * @param output The output of the program
 * @param expected_output The expected output
 * @return 0 if the output is correct, 1 otherwise
 */
int default_checker(char *output, char *expected_output);