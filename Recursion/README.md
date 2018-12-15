# Recursion


Muitos problemas computacionais têm a seguinte propriedade: cada instância do problema contém uma instância menor do mesmo problema.
Podemos chamar de recursão essa estrutura...

Many computational problems have the following property: Each instance of the problem contains a smaller instance of the same problem.
We can call recursion this structure ...

### Pseudo-código

Se a instância é pequena então resolva o problema
Se não 
	reduza-a a uma instânia menor do mesmo problema,
	aplique o método à instância menor
	e volte à instância original


#### Código

Considere um problema determinar o valor de um elemento máximo de um vetor v[0..n-1]. 
O tamanho de uma instância do problema é n. É claro que o problema só faz sentido se o vetor não for vazio, ou seja,
se n>= 1 . Se n =1 , então v[0] é o maior. 
Se n>1 então podemos procurar reduzindo este problema a problemas pequenos como mostramos no código

Recursion.c 

