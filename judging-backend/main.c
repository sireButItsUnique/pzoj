#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/time.h>
#include <sys/stat.h>
#include <signal.h>
#include <string.h>
#include <sys/mman.h>
#include <stdlib.h>
#include <errno.h>
#include <sys/ptrace.h>
#include <sys/resource.h>
#include <sys/user.h>
#include <sys/reg.h>
#include <signal.h>

#include "syscalls.h"
#include "checkers.h"

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
#define DIS_SYS 128

char *input_files[128], *output_files[128];

char *cleanse_string(char *str, int len) {
	if (!len) return calloc(1, 1);
	// remove trailing whitespaces and newlines
	char *ret = malloc((len + 1));
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

typedef int (*func_ptr)(char *, char *);
func_ptr check;

int main(int argc, char *argv[]) {
	// argv[1] is the language that the program is written in
	// argv[2] is the directory of the problem
	if (argc != 3) {
		fprintf(stderr, "invalid number of arguments\n");
		return IE;
	}

	if (chdir(argv[2])) {
		fprintf(stderr, "failed to chdir\n");
		return IE;
	}

	if (strncmp(argv[1], "cpp", 4) == 0) {
		// compile C++ program
		pid_t pid = fork();
		if (pid == 0) {
			// child process
			execl("/usr/bin/g++", "/usr/bin/g++", "main.cpp", "-std=c++20", NULL);
		} else if (pid > 0) {
			// parent process
			int status;
			waitpid(pid, &status, 0);
			if (WIFEXITED(status)) {
				if (WEXITSTATUS(status) != 0) {
					return CE;
				}
			} else {
				fprintf(stderr, "compiler terminated abnormally\n");
				return IE;
			}
		} else {
			fprintf(stderr, "fork failed\n");
			return IE;
		}
	} else if (strncmp(argv[1], "c", 2) == 0) {
		// compile C program
		pid_t pid = fork();
		if (pid == 0) {
			// child process
			execl("/usr/bin/gcc", "/usr/bin/gcc", "main.c", NULL);
		} else if (pid > 0) {
			// parent process
			int status;
			waitpid(pid, &status, 0);
			if (WIFEXITED(status)) {
				if (WEXITSTATUS(status) != 0) {
					return CE;
				}
			} else {
				fprintf(stderr, "compiler terminated abnormally\n");
				return IE;
			}
		} else {
			fprintf(stderr, "fork failed\n");
			return IE;
		}
	} else if (strncmp(argv[1], "py", 3) == 0) {
		rename("main.py", "a.out");
		// prepend #!/usr/bin/env pypy3
		FILE *f = fopen("a.out", "r+");
		if (f == NULL) {
			fprintf(stderr, "failed to open file handle a.out\n");
			return IE;
		}

		char *buf = malloc(65536);
		fread(buf, 1, 65536, f);
		fseek(f, 0, SEEK_SET);
		fprintf(f, "#!/usr/bin/env pypy3\n");
		fwrite(buf, 1, strlen(buf), f);
		fclose(f);

		if (chmod("a.out", 0755)) {
			fprintf(stderr, "failed to chmod a.out\n");
			return IE;
		}
	}
	else {
		fprintf(stderr, "unknown language\n");
		return IE;
	}

	FILE *init = fopen("judge.txt", "r");
	if (init == NULL) {
		fprintf(stderr, "failed to open judge file\n");
		return IE;
	}

	int time_limit, memory_limit; // time limit in seconds, memory limit in MB
	char checker[32];
	if (fscanf(init, "%d %d %s", &time_limit, &memory_limit, checker) != 3) {
		fprintf(stderr, "corrupted judge file\n");
		return IE;
	}

	if (strcmp(checker, "identical") == 0) {
		check = &strcmp;
	} else if (strcmp(checker, "default") == 0) {
		check = &default_checker;
	} else {
		fprintf(stderr, "unknown checker\n");
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

	fclose(init);

	// goal: run the program and compare the output to the expected output
	// while also checking for time limit and memory limit
	// if the program is killed by a signal, return the proper verdict (RTE | SEGV | FPE | ABRT)
	// use ptrace to monitor syscalls and memory usage
	// if the prorgam tries to use a disallowed syscall, return RTE | DIS_SYS

	struct rusage prev_use;

	for (int i = 0; i < numcases; i++) {
		getrusage(RUSAGE_CHILDREN, &prev_use);
		pid_t pid = fork();
		if (pid == 0) {
			// child
			freopen(input_files[i], "r", stdin);
			freopen("output.txt", "w", stdout);

			struct rlimit rlim;
			rlim.rlim_cur = time_limit;
			rlim.rlim_max = time_limit + 1;
			if (setrlimit(RLIMIT_CPU, &rlim)) {
				fprintf(stderr, "failed to set time limit\n");
				return IE;
			}
			
			rlim.rlim_cur = 1024 * 1024 * 1024;
			rlim.rlim_max = 1024 * 1024 * 1024; // 1 GB
			if (setrlimit(RLIMIT_AS, &rlim)) {
				fprintf(stderr, "failed to set memory limit\n");
				return IE;
			}

			ptrace(PTRACE_TRACEME, 0, NULL, NULL);
			execl("./a.out", "./a.out", NULL);
		} else if (pid > 0) {
			// unsigned long long penalty = 0;
			// parent
			while (1) {
				int status;
				waitpid(pid, &status, 0);
				if (WIFEXITED(status)) {
					if (WEXITSTATUS(status) != 0) {
						return IR;
					}
					struct rusage usage;
					getrusage(RUSAGE_CHILDREN, &usage);
					double time = usage.ru_utime.tv_sec - prev_use.ru_utime.tv_sec + (usage.ru_utime.tv_usec - prev_use.ru_utime.tv_usec) / 1000000.;
					time += usage.ru_stime.tv_sec - prev_use.ru_stime.tv_sec + (usage.ru_stime.tv_usec - prev_use.ru_stime.tv_usec) / 1000000.;
					if (time > time_limit)
						return TLE;
					printf("%ld", (long)(time * 1000));
					// check output
					FILE *f = fopen("output.txt", "r");
					char *ptr1 = mmap(0, 0x1000000, PROT_READ, MAP_SHARED, fileno(f), 0);
					fseek(f, 0, SEEK_END);
					char *tptr1 = cleanse_string(ptr1, ftell(f));
					munmap(ptr1, 0x1000000);
					fclose(f);
					f = fopen(output_files[i], "r");
					char *ptr2 = mmap(0, 0x1000000, PROT_READ, MAP_SHARED, fileno(f), 0);
					fseek(f, 0, SEEK_END);
					char *tptr2 = cleanse_string(ptr2, ftell(f));
					munmap(ptr2, 0x1000000);
					fclose(f);
					if (!(*check)(tptr1, tptr2)) {
						printf(" WA\n");
						return WA;
					}
					printf("\n");
					free(tptr1);
					free(tptr2);
					break;
				} else if (WIFSIGNALED(status)) {
					int sig = WEXITSTATUS(status);
					if (sig == SIGXCPU) {
						return TLE;
					} else if (sig == SIGSEGV) {
						return RTE | SEGV;
					} else if (sig == SIGFPE) {
						return RTE | FPE;
					} else if (sig == SIGABRT) {
						return RTE | ABRT;
					} else {
						fprintf(stderr, "unknown signal %d\n", sig);
						return RTE;
					}
				} else if (WIFSTOPPED(status)) {
					int sig = WSTOPSIG(status);
					if (sig == SIGTRAP) {
						long long rax = ptrace(PTRACE_PEEKUSER, pid, 8 * ORIG_RAX, NULL);
						if (rax == 231 || rax == 60) {
							// exit
							// look for memory usage in /proc/pid/status
							char path[32];
							sprintf(path, "/proc/%d/status", pid);
							FILE *f = fopen(path, "r");
							if (f == NULL) {
								fprintf(stderr, "failed to open /proc/pid/status\n");
								return IE;
							}

							char buf[512];
							while (fgets(buf, 512, f)) {
								if (strncmp(buf, "VmPeak:", 7) == 0) {
									int mem;
									if (sscanf(buf, "VmPeak: %d kB ", &mem) != 1) {
										fprintf(stderr, "failed to read memory usage\n");
										return IE;
									}
									if (mem > memory_limit * 1024) {
										return MLE;
									}
									printf("%d ", mem);
									break;
								}
							}
							fclose(f);
						}
						if (syscall_allowed(rax)) {
							ptrace(PTRACE_SYSCALL, pid, NULL, NULL);
						} else {
							fprintf(stderr, "disallowed syscall %lld\n", rax);
							kill(pid, SIGKILL);
							return RTE | DIS_SYS;
						}
					} else {
						int sig = WEXITSTATUS(status);
						if (sig == SIGXCPU) {
							return TLE;
						} else if (sig == SIGSEGV) {
							return RTE | SEGV;
						} else if (sig == SIGFPE) {
							return RTE | FPE;
						} else if (sig == SIGABRT) {
							return RTE | ABRT;
						} else {
							fprintf(stderr, "unknown signal %d\n", sig);
							return RTE;
						}
					}
				} else {
					fprintf(stderr, "program terminated abnormally\n");
					return RTE;
				}
			}
		} else {
			fprintf(stderr, "fork failed\n");
			return IE;
		}
	}
	return AC;
}	