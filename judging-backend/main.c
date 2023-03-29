#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <sys/stat.h>
#include <signal.h>
#include <string.h>
#include <sys/mman.h>
#include <stdlib.h>
#include <errno.h>
#include <sys/ptrace.h>

#define AC 0
#define WA 1
#define TLE 2
#define MLE 3
#define IE 4
#define OLE 5
#define CE 6
#define IR 7
#define RTE 8
#define SEGV 16
#define FPE 32
#define ABRT 64

char *input_files[128], *output_files[128];

char *cleanse_string(char *str) {
	// remove trailing whitespaces and newlines
	int len = strlen(str);
	char *ret = (char *)malloc((len + 1) * sizeof(char));
	strcpy(ret, str);
	while (len > 0 && (ret[len-1] == ' ' || ret[len-1] == '\n')) {
		ret[len-1] = '\0';
		len--;
	}
	// remove leading whitespaces
	while (*ret == ' ') {
		ret++;
	}
	return ret;
}

long long min(long long a, long long b) {
	return a < b ? a : b;
}

int main(int argc, char *argv[]) {
	// argv[1] is the path to the meta file
	// argv[2] is the language that the program is written in
	// argv[3] is the path to the code
	// argv[4] is the directory of the problem
	if (argc != 5) {
		printf("Usage: %s meta_file language code_dir problem_dir", argv[0]);
		return IE;
	}

	if (chdir(argv[4])) {
		return IE;
	}

	if (strncmp(argv[2], "cpp", 4) == 0) {
		// compile C++ program
		pid_t pid = fork();
		if (pid == 0) {
			// child process
			execl("/usr/bin/g++", "/usr/bin/g++", argv[3], NULL);
		} else if (pid > 0) {
			// parent process
			int status;
			waitpid(pid, &status, 0);
			if (WIFEXITED(status)) {
				if (WEXITSTATUS(status) != 0) {
					return CE;
				}
			} else {
				return IE;
			}
		} else {
			return IE;
		}
	} else if (strncmp(argv[2], "c", 2) == 0) {
		// compile C program
		pid_t pid = fork();
		if (pid == 0) {
			// child process
			execl("/usr/bin/gcc", "/usr/bin/gcc", argv[3], NULL);
		} else if (pid > 0) {
			// parent process
			int status;
			waitpid(pid, &status, 0);
			if (WIFEXITED(status)) {
				if (WEXITSTATUS(status) != 0) {
					return CE;
				}
			} else {
				return IE;
			}
		} else {
			return IE;
		}
	} else if (strncmp(argv[2], "py", 3) == 0) {
		rename(argv[3], "a.out");
		// prepend #!/usr/bin/env pypy3
		FILE *f = fopen("a.out", "r+");
		if (f == NULL) {
			return IE;
		}

		char *buf = (char *)malloc(65536 * sizeof(char));
		fread(buf, 1, 65536, f);
		fseek(f, 0, SEEK_SET);
		fprintf(f, "#!/usr/bin/env pypy3\n");
		fwrite(buf, 1, strlen(buf), f);
		fclose(f);

		if (chmod("a.out", 0755)) {
			return IE;
		}
	}
	else {
		return IE;
	}

	FILE *init = fopen(argv[1], "r");
	if (init == NULL) {
		return IE;
	}

	int time_limit, memory_limit; // time limit in seconds, memory limit in MB
	int star_rating; // not used
	if (fscanf(init, "%d %d %d", &time_limit, &memory_limit, &star_rating) != 3) {
		return IE;
	}

	char in[32], out[32];
	int numcases = 0;
	while (fscanf(init, "%s %s", in, out) == 2) {
		input_files[numcases] = malloc(strlen(in) + 6);
		output_files[numcases] = malloc(strlen(out) + 6);
		strcpy(input_files[numcases], "test/");
		strcpy(output_files[numcases], "test/");
		strcpy(input_files[numcases]+5, in);
		strcpy(output_files[numcases]+5, out);
		numcases++;
	}

	struct rusage prev_usage;

	for (int i = 0; i < numcases; i++) {
		getrusage(RUSAGE_CHILDREN, &prev_usage);
		pid_t pid = fork();
		if (pid == 0) {
			// child process
			struct rlimit rlim;
			rlim.rlim_cur = time_limit;
			rlim.rlim_max = 10;
			setrlimit(RLIMIT_CPU, &rlim);
			rlim.rlim_cur = memory_limit * 1048576;
			rlim.rlim_max = 1073741824;
			setrlimit(RLIMIT_AS, &rlim);
			freopen(input_files[i], "r", stdin);
			freopen("output.txt", "w", stdout);
			execl("./a.out", "./a.out", NULL);
		} else if (pid > 0) {
			// parent process
			int status;
			waitpid(pid, &status, 0);
			if (WIFEXITED(status)) {
				if (WEXITSTATUS(status) == 0) {
					char *ptr_1 = mmap(0, 0x1000, PROT_READ, MAP_PRIVATE, fileno(fopen("output.txt", "r")), 0);
					char *ptr_2 = mmap(0, 0x1000, PROT_READ, MAP_PRIVATE, fileno(fopen(output_files[i], "r")), 0);
					ptr_1 = cleanse_string(ptr_1);
					ptr_2 = cleanse_string(ptr_2);
					if (strcmp(ptr_1, ptr_2) != 0) {
						return WA;
					}
					munmap(ptr_1, 0x1000);
					munmap(ptr_2, 0x1000);

					struct rusage usage;
					getrusage(RUSAGE_CHILDREN, &usage);
					printf("AC %ld %ld\n", (usage.ru_utime.tv_sec - prev_usage.ru_utime.tv_sec) * 1000 + (usage.ru_utime.tv_usec - prev_usage.ru_utime.tv_usec) / 1000, usage.ru_maxrss);
				} else if (WEXITSTATUS(status) == ENOMEM) {
					return MLE;
				} else {
					return IR;
				}
			} else if (WIFSIGNALED(status)) {
				struct rusage usage;
				getrusage(RUSAGE_CHILDREN, &usage);
				if (WTERMSIG(status) == SIGXCPU || (WTERMSIG(status) == SIGKILL && (usage.ru_utime.tv_sec - prev_usage.ru_utime.tv_sec) * 1000 + (usage.ru_utime.tv_usec - prev_usage.ru_utime.tv_usec) / 1000 > time_limit)) {
					return TLE;
				} else if (WTERMSIG(status) == SIGXFSZ || (WTERMSIG(status) == SIGSEGV && usage.ru_maxrss > memory_limit)) {
					return MLE;
				} else if (WTERMSIG(status) == SIGSEGV) {
					return RTE | SEGV;
				} else if (WTERMSIG(status) == SIGFPE) {
					return RTE | FPE;
				} else if (WTERMSIG(status) == SIGABRT) {
					return RTE | ABRT;
				} else {
					printf("%d\n", WTERMSIG(status));
					return RTE;
				}
			} else {
				return RTE;
			}
		} else {
			return IE;
		}
	}

	remove("output.txt");
	remove("a.out");
	remove(argv[3]);
	
	return AC;
}