// SYNTHETIC sample notes written for this project's demo (not copied from any textbook or university).
export const SAMPLE_TITLE = "CPU Scheduling (synthetic sample notes)";
export const SAMPLE_NOTES = `CPU scheduling decides which process in the ready queue gets the CPU next.

First Come First Served (FCFS) runs processes in the order they arrive. It is simple and non-preemptive, but a long process at the front makes short processes wait. This effect is called the convoy effect.

Shortest Job First (SJF) picks the process with the smallest burst time. It gives the minimum average waiting time among non-preemptive algorithms, but it needs to know burst times in advance and long processes may starve. The preemptive version is called Shortest Remaining Time First (SRTF).

Round Robin (RR) gives each process a fixed time slice called the time quantum. If a process does not finish in its quantum, it goes to the back of the ready queue. If the quantum is too large, RR behaves like FCFS. If it is too small, too much time is lost in context switching.

Priority scheduling picks the process with the highest priority. Low-priority processes can starve. Aging, which slowly raises the priority of waiting processes, fixes this.

Key formulas: Turnaround time = completion time minus arrival time. Waiting time = turnaround time minus burst time.`;
