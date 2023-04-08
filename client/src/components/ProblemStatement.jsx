import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default () => {
	const router = useRouter();
	const { courseId } = router.query;
	const [content, setContent] = useState(<div className="course">
		<h1 id="ioi13p6game">IOI '13 P6 - Game</h1>
		<p>Bazza and Shazza are playing a game. The board is a grid of cells, with $R$ rows number $0,\dots,R-1$, and $C$ columns numbered $0,\dots,C-1$. We let $(P,Q)$ denote the cell in row $P$ and column $Q$. Each cell contains a non-negative integer, and at the beginning of the game all of these integers are zero.</p>
		<p>The game proceeds as follows. At any time, Bazza may either:</p>
		<ul>
			<li>update a cell $(P,Q)$, by assigning the integer that it contains;</li>
			<li>ask Shazza to calculate the greatest common divisor (GCD) of all integers within a rectangular block of cells, with opposite corners $(P,Q)$ and $(U,V)$ inclusive. Bazza will take $N_U+N_Q$ actions (updating cells $N_U$ times and asking question $N_Q$ times) before he gets bored and goes outside to play cricket.</li>
		</ul>
		<p>Your task is to work out the correct answers.</p>
		<h2 id="example">Example</h2>
		<p>Suppose $R=2$ and $C=3$, and Bazza begins with the following updates:</p>
		<ul>
			<li>Update cell $(0,0)$ to $20$;</li>
			<li>Update cell $(0,2)$ to $15$;</li>
			<li>Update cell $(1,1)$ to $12$.</li>
		</ul>
		<p>The resulting grid is shown in the picture above. Bazza might then ask for GCDs in the following rectangles:</p>
		<ul>
			<li>Opposite corners $(0,0)$ and $(0,2)$: The three integers in this rectangle are $20,0$ and $15$, and their GCD is $5$.</li>
			<li>Opposite corners $(0,0)$ and $(1,1)$: The four integers in this rectangle are $20,0,0,$ and $12$, and their GCD is $4$.</li>
		</ul>
		<p>Now suppose Bazza makes the following updates:</p>
		<ul>
			<li>Update cell $(0,1)$ to $6$;</li>
			<li>Update cell $(1,1)$ to $14$.</li>
		</ul>
	</div>);
	return (
		<>
			<div className="w-full">
                {content}
            </div>
		</>
	);
};