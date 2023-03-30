# judging backend

- allowed syscalls:
	- read
	- write
	- mmap/munmap/mprotect/mremap
	- brk
	- ioctl
	- pread64/pwrite64
	- readv/writev
	- exit
	- fcntl
	- fsync/fdatasync
	- uselib

- judging should be run with the following command:
./judge <init.txt> <language> <code_file> <problem_dir>
- each problem directory should have a "problem.txt" file, "meta.txt", and a "test" directory
- the test directory should contain the test cases referenced in meta.txt (without "test/")
- do NOT set the problem directory as the test directory
- test case file names cannot be over 32 characters
- problem.txt should contain the problem description
- meta.txt should contain the problem metadata:
	- (time_limit (s)) (memory_limit (MB)) (star_rating (1-10))
	- (input_file) (output_file)
	...

- web backend MUST remove code_file, output.txt, and a.out after judging