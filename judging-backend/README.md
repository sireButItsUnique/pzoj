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

- init.txt should be structured as such:

(time_limit (s)) (memory_limit (MB))

(input_file) (output_file)

...

- input_file and output_file should be in the same directory as init.txt
- judging should be run with the following command:
./judge <init.txt> <language> <code_file> <problem_dir>
- each problem directory should have a "problem.txt" file and a "test" directory
- the test directory should contain the test cases as well as init.txt
- do NOT set the problem directory as the test directory
- test case file names cannot be over 32 characters