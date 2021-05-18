async function makeTicket()
{
    console.log(Train);
    console.log(Stops);

    const name = document.getElementById('name_input').value;
    const num = document.getElementById('number_input').value;
    const start_stat = document.getElementById('Start_input').value;
    const stop_stat = document.getElementById('Stop_input').value;
    const privilage = document.getElementById('Privilage_input').value;

    const response = await fetch('/SendStats');
    const data = await response.json();

    var start_dist;
    var stop_dist;
    for(item of data)
    {
        if(start_stat == item.Name)
        {
            start_dist = item.Dist;
        }
        if(stop_stat == item.Name)
        {
            stop_dist = item.Dist;
        }
    }

    const dist = stop_dist - start_dist;
    console.log(dist);
}